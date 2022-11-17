import Image from "next/image";

export default function Footer() {
    return (
        <footer>
            <div className="pt-5 pb-2 flex">
                <div className="footerLogo">
                    <Image src="/images/nft-graphics/nft-logo-green.png" alt="NFT coin" width={80} height={80} />
                </div>
                <div className="footerLogo">
                    <Image src="/images/nft-graphics/nft-coin-gold.png" alt="NFT coin" width={80} height={80} />
                </div>
                <div className="footerLogo">
                    <Image src="/images/nft-graphics/nft-logo-green.png" alt="NFT coin" width={80} height={80} />
                </div>
                <div className="footerLogo">
                    <Image src="/images/nft-graphics/nft-coin-gold.png" alt="NFT coin" width={80} height={80} />
                </div>
                <div className="footerLogo">
                    <Image src="/images/nft-graphics/nft-logo-green.png" alt="NFT coin" width={80} height={80} />
                </div>
            </div>
            <div className="footerDescription">
                {/* <span className="footerDescriptionIcon">
                    <a href="http://google.com" target="_blank">
                        <Image src="/images/icons/website.png" alt="Website icon" width={30} height={30} />
                    </a>
                </span> */}
                <span className="footerDescriptionIcon">
                    <a href="mailto:kryptoprogramista89@gmail.com" target="_blank">
                        <Image src="/images/icons/email.png" alt="Email icon" width={30} height={30} />
                    </a>
                </span>
                <span className="footerDescriptionIcon">
                    <a href="https://github.com/dariuszsetlak89" target="_blank">
                        <Image src="/images/icons/github.png" alt="Github icon" width={30} height={30} />
                    </a>
                </span>
                <span className="footerDescriptionText">Copyright © 2022 dariuszsetlak89</span>
                {/* <span className="footerDescriptionIcon">
                    <a href="https://www.linkedin.com/in/dariuszsetlak/" target="_blank">
                        <Image src="/images/icons/linkedin.png" alt="Linkedin icon" width={30} height={30} />
                    </a>
                </span> */}
                <span className="footerDescriptionIcon">
                    <a href="https://t.me/DarekS89" target="_blank">
                        <Image src="/images/icons/telegram.png" alt="Telegram icon" width={30} height={30} />
                    </a>
                </span>
                <span className="footerDescriptionIcon">
                    <a href="https://twitter.com/kprogramista89" target="_blank">
                        <Image src="/images/icons/twitter.png" alt="Twitter icon" width={30} height={30} />
                    </a>
                </span>
            </div>
        </footer>
    );
}
