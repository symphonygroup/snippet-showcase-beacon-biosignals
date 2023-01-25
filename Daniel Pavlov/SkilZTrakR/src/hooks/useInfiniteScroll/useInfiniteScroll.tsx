import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { throttle, isEmpty } from 'lodash';
import { Text, Spinner } from '@chakra-ui/react';
import If from '../../components/If';
import { SortField } from '../../types/params';

export interface NextCall {
  page: number | undefined;
  size: number;
  sort?: SortField[];
}

interface Props<R> {
  rows: R[];
  next: (props: NextCall) => void;
  hasMore: boolean;
  loading: boolean;
  page?: number;
  size?: number;
  sort?: SortField[];
  container?: HTMLElement;
}

const THRESHOLD_FROM_BOTTOM = 20;

const throttleHandler = (
  {
    hasMoreRef,
    loadingRef,
    busyRef,
    triggerRef,
    container,
    next,
    pageRef,
    size,
    sort
  }: {
    hasMoreRef: React.MutableRefObject<boolean>,
    loadingRef: React.MutableRefObject<boolean>,
    busyRef: React.MutableRefObject<boolean>,
    triggerRef: { current: { getBoundingClientRect: Function } },
    container: HTMLElement | undefined,
    next: Function,
    pageRef: React.MutableRefObject<number | undefined>,
    size: number,
    sort: SortField[]
  }
) => {
  if (!hasMoreRef.current || loadingRef.current || busyRef.current) return;

  if (triggerRef.current) {
    let isVisible = false;
    const triggerPosition = triggerRef.current.getBoundingClientRect().top;

    if (container) {
      const containerHeight = container.getBoundingClientRect().bottom;
      isVisible =
        triggerPosition - containerHeight <= -THRESHOLD_FROM_BOTTOM;
    } else {
      isVisible =
        triggerPosition - window.innerHeight <= -THRESHOLD_FROM_BOTTOM;
    }

    if (isVisible) {
      busyRef.current = true;
      next({ page: pageRef.current, size, sort });
    }
  }
}

const useUpcomingPagesScrollHandler = (page: number, scrollCallback: Function) => {
  useEffect(() => {
    if (page > 0) {
      scrollCallback();
    }
  }, [page, scrollCallback]);
}

const useFirstPageScrollHandler = (rows: any, hasMore: boolean, page: number, scrollCallback: Function) => {
  useEffect(() => {
    if (isEmpty(rows) && hasMore && page === 0) {
      scrollCallback();
    }
  }, [hasMore, page, rows, scrollCallback]);
}

export default function useInfiniteScroll<R>({
  rows,
  next,
  hasMore,
  loading = false,
  page = 0,
  size: s = 20,
  sort: srt = [],
  container,
}: Props<R>) {
  const [size] = useState(s);
  const [sort, setSort] = useState<SortField[]>(srt);
  const triggerRef: any = React.useRef<HTMLDivElement>();
  const pageRef = React.useRef<number>();
  const busyRef = React.useRef<boolean>(false);
  const hasMoreRef = React.useRef<boolean>(hasMore);
  const loadingRef = React.useRef<boolean>(loading);

  /**
   * instantly update (useEffect, events racing with the same memoized scrollCallback)
   */
  if (!loading) {
    busyRef.current = false;
  }

  pageRef.current = page;
  hasMoreRef.current = hasMore;
  loadingRef.current = loading;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollCallback = useCallback(
    throttle(() =>
      throttleHandler({
        hasMoreRef: hasMoreRef,
        loadingRef: loadingRef,
        busyRef: busyRef,
        triggerRef: triggerRef,
        container: container,
        next: next,
        pageRef: pageRef,
        size: size,
        sort: sort,
      }), 100
    ),
    [container, next, size, sort]
  );

  useUpcomingPagesScrollHandler(page, scrollCallback);

  useFirstPageScrollHandler(rows, hasMore, page, scrollCallback);

  useEffect(() => {
    if (container) {
      container.addEventListener('scroll', scrollCallback);
      document.removeEventListener('scroll', scrollCallback);
    } else {
      document.addEventListener('scroll', scrollCallback);
    }

    window.addEventListener('resize', scrollCallback);
    return () => {
      if (container) {
        container.removeEventListener('scroll', scrollCallback);
      } else {
        document.removeEventListener('scroll', scrollCallback);
      }

      window.removeEventListener('resize', scrollCallback);
    };
  }, [container, page, scrollCallback]);

  const Trigger = useMemo(
    () =>
      (props: JSX.IntrinsicAttributes) => (
        <>
          <If condition={!hasMore && isEmpty(rows)}>
            <Text fontSize="xs" {...props}>
              No data available.
            </Text>
          </If>
          <Text
            ref={triggerRef}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={45}
            style={{ opacity: loading ? 1 : 0 }}
            {...props}
          >
            Loading <Spinner ml="10px" />
          </Text>
        </>
      ),
    [hasMore, loading, rows]
  );

  return { Trigger, sort, setSort };
}
