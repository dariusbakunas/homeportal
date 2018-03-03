import { createSelector } from 'reselect';

export const accessToken = (state) => state.auth.accessToken;
export const domains = (state) => state.vms.domains;

export const domainListSelector = createSelector(
  [domains],
  (domains) => {
    if (domains) {
      return Object.keys(domains)
        .map((id) => domains[id]);
    } else {
      return [];
    }
  }
);
