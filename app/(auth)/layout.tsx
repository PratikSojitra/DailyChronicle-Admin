import AuthHeader from "@/components/common/AuthHeader";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <AuthHeader />
            {children}
        </div>
    )
}