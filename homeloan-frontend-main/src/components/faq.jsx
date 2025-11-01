import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDownCircle } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import { Card, CardContent } from "./ui/card";
import robo from "../assets/robo1.png";

const faqs = [
  { question: "What is a home loan?", answer: "A home loan is a secured loan offered by banks or financial institutions to help you purchase, construct, or renovate a residential property." },
  { question: "What is the minimum income required to apply for a home loan?", answer: "The minimum income requirement varies by lender, but typically starts from ₹25,000 to ₹40,000 per month depending on the city and property value." },
  { question: "Compare All Bank Offers", answer: "Get instant access to the latest interest rates, processing fees, and eligibility criteria from top banks and NBFCs in one place." },
  { question: "How to calculate home loan EMI?", answer: "Home Loan EMI is calculated based on the loan amount, interest rates and tenure by using the simple formula of EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]." },
  { question: "Can I Get a Home Loan with a Low Credit Score?", answer: "Yes, you can still get a home loan with a low credit score. However, the interest rate will likely be higher. Most banks prefer to offer home loans to individuals with a credit score of 750 or above." },
  { question: "Is it mandatory to have a co-applicant for a home loan?", answer: "It's not mandatory to have a co-applicant for a home loan, but having one can improve your loan eligibility. If the co-applicant's profile is eligible, getting the loan becomes much easier." },
  { question: "What is CIBIL score?", answer: "A CIBIL score represents your creditworthiness and ranges from 300 to 900. A good CIBIL score—typically above 750—is important for getting approved for loans and credit cards. It plays a crucial role in determining your eligibility." },
  { question: "How much home loan can I get on a 60,000 salary?", answer: "You can get a home loan of up to 60–80 times your monthly salary, which means a loan of ₹36–48 lakhs on a salary of ₹60,000. However, this amount may vary based on factors like your credit score, loan tenure, and interest rates." },
  { question: "What is the EMI for a 13 lakh home loan for 10 years?", answer: "The EMI for a 13 lakh home loan for 10 years would depend on the interest rate. Assuming an interest rate of 8% per annum, the EMI would be approximately ₹15,747 per month." },
  { question: "What is the interest rate of HDFC home loan?", answer: "HDFC home loan interest rates vary based on factors like loan amount, tenure, and credit score. Generally, HDFC home loan interest rates start from around 8.45% per annum for loans up to 30 lakhs and 8.65% per annum for loans above 30 lakhs." },
  { question: "Do I get tax benefits on my housing loan?", answer: "Yes, you can claim tax benefits on your housing loan. Under Section 24B of the Income Tax Act, you can claim a deduction of up to ₹2 lakhs on the interest paid. Additionally, you can claim up to ₹1.5 lakhs on the principal under Section 80C." },
  { question: "When does home loan EMI start?", answer: "Home loan EMI typically starts one month after the loan disbursement date. However, the exact date may vary based on the lender's policies and the loan agreement." },
];

function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function ScrollingRow({
  items,
  rowIndex,
  cardWidth = 320,
  gap = 24,
  speed = 30,
  onHoverIndexChange,
}) {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [paused, setPaused] = useState(false);
  const xTransform = useTransform(x, (v) => `${v}px`);

  const measured = useRef({ width: 0 });

  const measureWidth = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const firstChild = container.querySelector(".scroll-copy");
    if (containerRef.current) {
      measured.current.width = containerRef.current.scrollWidth / 3; // because we have three copies
    }
  }, []);

  useEffect(() => {
    measureWidth();
    window.addEventListener("resize", measureWidth);
    return () => window.removeEventListener("resize", measureWidth);
  }, [measureWidth]);

  // And for right-moving row, start x negative so that prepended items are visible
  useEffect(() => {
    if (rowIndex % 2 === 1) {
      x.set(-measured.current.width); // shift left by one copy
    } else {
      x.set(0);
    }
  }, [measured.current.width, rowIndex, x]);

  useAnimationFrame((t, delta) => {
    if (prefersReduced || paused || !containerRef.current) return;

    const dir = rowIndex % 2 === 0 ? -1 : 1;
    const increment = dir * speed * (delta / 1000);
    let next = x.get() + increment;

    const width = measured.current.width;
    if (!width) return;

    // wrap cleanly
    if (dir === -1 && next <= -width) x.set(next + width);
    else if (dir === 1 && next >= 0) x.set(next - width);
    else x.set(next);
  });

  const reversedItems = items.slice().reverse();
  const renderItems =
    rowIndex % 2 === 0
      ? [...items, ...items, ...items] // left-moving: normal
      : [...reversedItems, ...items, ...reversedItems]; // right-moving: prepended + normal + appended


  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      onMouseEnter={() => {
        setPaused(true);
        onHoverIndexChange(rowIndex);
      }}
      onMouseLeave={() => {
        setPaused(false);
        onHoverIndexChange(null);
      }}
    >
      <motion.div
        className="flex flex-nowrap items-start gap-6 scroll-copy"
        style={{ x: xTransform }}
      >
        {renderItems.map((faq, idx) => (
          <div
            key={`${rowIndex}-${idx}-${faq.question}-${idx}`}
            className="flex-none min-w-[200px] md:min-w-[270px]"
            style={{ width: cardWidth - 30 }}
          >
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-shadow duration-300">
              <CardContent className="p-4 text-white min-h-[120px] flex flex-col justify-start">
                <div className="font-semibold text-lg">{faq.question}</div>
                <div className="mt-2 text-sm font-medium leading-relaxed">{faq.answer}</div>
              </CardContent>
            </Card>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Accordion() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [cardWidth, setCardWidth] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(window.innerWidth < 768 ? 250 : 300);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerRow = 6;
  const rows = chunkArray(
    [...faqs, ...faqs.slice(0, itemsPerRow - (faqs.length % itemsPerRow || itemsPerRow))],
    itemsPerRow
  );

  return (
    <section className="relative max-w-full mx-auto px-6 pt-32 pb-16 bg-gradient-to-br from-green-950 via-green-800 to-green-950 overflow-hidden border-2 border-green-700/60 rounded-lg">
      {/* subtle background glows */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />

      {/* heading */}
      <motion.div
        className="flex items-center justify-center relative mb-20 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3 backdrop-blur-md bg-white/100 border border-white/20 px-8 py-2 rounded-full shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-800 to-green-700 bg-clip-text text-transparent text-center">
            Hobot is here to help you!
          </h2>
        </div>
        <img
          src={robo}
          alt="Friendly robot"
          className="block w-20 md:w-38 h-auto object-contain self-center opacity-90 drop-shadow-[0_10px_15px_rgba(255,255,255,4)] absolute left-4 md:left-80 transform -translate-x-1/2"
        />
      </motion.div>

      {/* scrolling rows for all devices */}
      <div className="space-y-8">
        {rows.map((row, rowIndex) => (
          <ScrollingRow
            key={rowIndex}
            items={row}
            rowIndex={rowIndex}
            cardWidth={cardWidth}
            gap={24}
            speed={30}
            onHoverIndexChange={setHoveredRow}
          />
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-white/70">
        Can’t find your question? Reach out to our <a href="https://wa.me/6026026026" className="text-black underline decoration-gray-900">support</a>.
      </p>
    </section>
  );
}
