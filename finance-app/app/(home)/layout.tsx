import Navbar from "./_components/Navbar";

export default function Layout({
    children
}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen w-full bg-slate-100">
            <Navbar />
            {children}
        </div>
    )
}