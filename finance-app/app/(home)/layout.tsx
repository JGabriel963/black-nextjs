import Navbar from "./_components/Navbar";

export default function Layout({
    children
}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen bg-slate-100">
            <Navbar />
            { children }
        </div>
    )
}