export const QUERY_KEYS = {
  auth: {
    setupComplete: ["auth", "setup-complete"],
    currentUser: ["auth", "current-user"],
  },
  customers: {
    all: ["customers"],

    list: (page: number, pageSize: number) => ["customers", page, pageSize],
  },
} as const;
