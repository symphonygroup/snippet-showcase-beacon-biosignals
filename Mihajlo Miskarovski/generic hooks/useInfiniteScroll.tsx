import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { throttle, isEmpty } from 'lodash';
import { Text, InlineSpinner } from '@tidbits/react-tidbits';
import If from '../../components';
import { SortField } from '../../types/params';

export interface NextCall {
  page: number;
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
  const triggerRef = React.useRef<HTMLDivElement>();
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

  const scrollCallback = useCallback(
    throttle(() => {
      if (!hasMoreRef.current || loadingRef.current || busyRef.current) return;

      if (triggerRef.current) {
        let isVisible = false;
        const triggerPosition = triggerRef.current.getBoundingClientRect().top;

        if (container) {
          const containerHeight = container.getBoundingClientRect().bottom;
          isVisible = triggerPosition - containerHeight <= -THRESHOLD_FROM_BOTTOM;
        } else {
          isVisible = triggerPosition - window.innerHeight <= -THRESHOLD_FROM_BOTTOM;
        }

        if (isVisible) {
          busyRef.current = true;
          next({ page: pageRef.current, size, sort });
        }
      }
    }, 100),
    [container, next, size, sort]
  );

  useEffect(() => {
    if (page > 0) {
      scrollCallback();
    }
  }, [page, scrollCallback]);

  useEffect(() => {
    if (isEmpty(rows) && hasMore && page === 0) {
      scrollCallback();
    }
  }, [hasMore, page, rows, scrollCallback]);

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
    () => (props) => (
      <>
        <If condition={!hasMore && isEmpty(rows)}>
          <Text sa="tight" {...props}>
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
          Loading <InlineSpinner ml="10px" visible />
        </Text>
      </>
    ),
    [hasMore, loading, rows]
  );

  return { Trigger, sort, setSort };
}
