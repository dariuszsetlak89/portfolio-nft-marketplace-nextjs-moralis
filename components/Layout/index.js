import Header from "./Header";
import Connector from "./Connector";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="font-sans pt-10 pb-40 bg-lime-200">
            <div
                className="mx-auto max-w-4xl overflow-hidden border-4
                border-lime-400 rounded-xl bg-lime-300"
            >
                <Header />
                <Navbar>
                    <Connector />
                </Navbar>
                <div className="border-b-4 border-lime-400">{children}</div>
                <Footer className="fixed bottom-0 left-0" />
            </div>
        </div>
    );
}
