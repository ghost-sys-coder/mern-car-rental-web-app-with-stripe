import { Footer, Navbar, Sidebar } from "@/components"
import { Outlet } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext"


const MainLayout = () => {
    const { isOpenSideBar } = useAuthContext();

    return (
        <main className="main-layout">
            <Navbar />
            {isOpenSideBar && (<Sidebar />)}
            <Outlet />
            <Footer />
        </main>
    )
}

export default MainLayout