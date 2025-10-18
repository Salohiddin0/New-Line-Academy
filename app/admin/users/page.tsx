export const metadata = { title: "Manage Users — Admin" }

export default function AdminUsersPage({ }: Record<string, never> = {}) {
  // Placeholder for future auth integration (NextAuth / JWT)
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Users</h2>
      <p className="text-sm text-muted-foreground">
        Integrate your authentication provider (NextAuth/JWT) and database, then manage users here.
      </p>
    </div>
  )
}
