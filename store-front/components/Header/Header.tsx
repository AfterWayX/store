import Link from "next/link"

export const Header = () => {
    return (
        <div className="flex items-center bg-slate-800 h-20 text-white">
            <div className="container flex justify-between">
                <Link href="/">
                    <a>
                        <h1 className="text-3xl font-bold">
                            Logo
                        </h1>
                    </a>
                </Link>
                <div className="flex">
                    <Link href="/products">
                        <a>
                            <nav className="font-medium text-xl">
                                Products
                            </nav>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}