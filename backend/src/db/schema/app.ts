import { pgTable, text, timestamp, uuid, unique , boolean, integer, index} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull(),
  ...timestamps,
});

export const flags = pgTable(
  "flags",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    environment: text("environment", {
      enum: ["development", "staging", "production"],
    }).notNull(),
    defaultState: boolean("default_state").notNull(),
    rolloutPercentage: integer("rollout_percentage").default(0).notNull(),
    createdBy: uuid("created_by").notNull().references(() => users.id),
    ...timestamps,
  },
  (t) => [
    unique().on(t.name, t.environment),
    index().on(t.environment),
  ]
);
