export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <main className="flex-grow max-w-4xl mx-auto p-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">Practical Google Maps API for Front-end Developer</h1>

                <h2 className="text-xl font-bold text-gray-900 mt-4">Table of Contents</h2>
                <ul className="mt-4">
                    <li>
                        <a href="/static-maps" className="text-blue-500 hover:text-blue-700">Static Maps</a>
                    </li>
                </ul>
            </main>

            <footer className="mt-auto text-center p-8">
                <a href="https://www.udemy.com/course/practical-google-maps-api-for-front-end-developer/?referralCode="
                   target="_blank" className="text-blue-500 hover:text-blue-700">Udemy Course: Practical Google Maps API
                    for Front-end Developer</a>
            </footer>
        </div>
    )
}