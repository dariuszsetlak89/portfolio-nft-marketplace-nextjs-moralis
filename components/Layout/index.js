import Header from "./Header";
import Navbar from "./Navbar";
import Connector from "./Connector";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="outerBackground">
            <div className="innerBackground">
                <Header />
                <Navbar>
                    <Connector />
                </Navbar>
                <div>{children}</div>
                <Footer className="footer" />
            </div>
        </div>
    );
}
