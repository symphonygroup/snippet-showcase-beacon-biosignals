import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { createTransform, persistReducer } from 'redux-persist';
import user from './slices/user';
import skillsPending from './slices/skillsPending';
import organizationSkills from './slices/organizationSkills';
import organizationSkillGroups from './slices/organizationSkillGroups';
import organizationEmployees from './slices/organizationEmployees';

const denyListTransform = createTransform((inboundState: any, key: any) => {
  if (key === 'params') {
    return { ...inboundState, page: 0 };
  }
  return inboundState;
});

const userPersistConfig = {
  key: 'user',
  storage,
  transforms: [denyListTransform],
};

const skillsPendingPersistConfig = {
  key: 'skillsPending',
  storage,
  blacklist: ['list', 'hasMore', 'loading'],
  transforms: [denyListTransform],
};

const organizationSkillsPersistConfig = {
  key: 'organizationSkills',
  storage,
  blacklist: ['list', 'hasMore', 'loading'],
  transforms: [denyListTransform],
};

const organizationSkillGroupsPersistConfig = {
  key: 'organizationSkillGroups',
  storage,
  blacklist: ['list', 'hasMore', 'loading'],
  transforms: [denyListTransform],
};

const organizationEmployeesPersistConfig = {
  key: 'organizationEmployees',
  storage,
  blacklist: ['list', 'hasMore', 'loading'],
  transforms: [denyListTransform],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, user.reducer),
  skillsPending: persistReducer(skillsPendingPersistConfig, skillsPending.reducer),
  organizationSkills: persistReducer(organizationSkillsPersistConfig, organizationSkills.reducer),
  organizationSkillGroups: persistReducer(organizationSkillGroupsPersistConfig, organizationSkillGroups.reducer),
  organizationEmployees: persistReducer(organizationEmployeesPersistConfig, organizationEmployees.reducer),
});

export default rootReducer;
