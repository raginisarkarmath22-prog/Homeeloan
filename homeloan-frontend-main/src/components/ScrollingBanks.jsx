import React from "react";

const bankLogos = [
  "/Banks/sbi.png",
  "/Banks/hdfc.png",
  "/Banks/icici.png",
  "/Banks/axis.png",
  "/Banks/kotak.png",
  "/Banks/pnb.png",

  "/Banks/yesbank.png",
  "/Banks/boi.png",
  "/Banks/indusind.png",
  "/Banks/unionbank.png",

  
];

const bankLinks = {
  sbi: "/loan/sbi",
  hdfc: "/loan/hdfc",
  icici: "/loan/icici",
  axis: "/loan/axis",
  kotak: "/loan/kotak",
  pnb: "/loan/pnb",
  yesbank: "/loan/yesbank",
  boi: "/loan/boi",
  indusind: "/loan/indusind",
  idfc: "/loan/idfc",
};

const getBankName = (logoPath) => {
  const filename = logoPath.split("/").pop();
  return filename.split(".")[0].toLowerCase();
};

function Scroll() {
  const logos = [...bankLogos, ...bankLogos]; // duplicate for continuous scroll

  return (
    <div className="w-full overflow-hidden">
      <div className="flex w-max animate-scroll-right gap-8">
        {logos.map((logo, index) => {
          const bankName = getBankName(logo);
          const href = bankLinks[bankName] || "#";

          return (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[50px] p-2 h-[48px] bg-white/40 rounded-full inset-ring-neutral-900  shadow flex-shrink-0  hover:scale-105 transition-transform"
            >
              <img
                src={logo}
                alt={bankName}
                className="h-[30px] w-full px-2 object-center "
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Scroll;
