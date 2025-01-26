'use client'
import { OrganizationSwitcher, useAuth } from "@clerk/nextjs"


export default function OrganizationIdPage() {
    const { userId, orgId } = useAuth()
    return (
        <div>
            Organization ID: {orgId}
        </div>
    )
}