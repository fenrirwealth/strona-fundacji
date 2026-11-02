export function ChristmasWorkshop() {
  return <div className="christmas-workshop mt-8 overflow-hidden rounded-2xl border border-gold/20 bg-[#180f1b] px-4 pt-4" role="img" aria-label="Animowana ilustracja: dwa elfy pakują świąteczne prezenty przy stole.">
    <p className="text-center text-xs font-semibold uppercase tracking-[.18em] text-gold">Razem przygotujmy świąteczną radość</p>
    <svg viewBox="0 0 600 165" className="mx-auto block w-full max-w-[560px]" aria-hidden="true">
      <defs><linearGradient id="workshop-gift" x2="1" y2="1"><stop stopColor="#b83848"/><stop offset="1" stopColor="#791c31"/></linearGradient></defs>
      <path d="M30 20Q300 65 570 20" fill="none" stroke="#725b38" strokeWidth="2" />
      {[65,135,215,300,385,465,535].map((x,i)=><circle key={x} className="workshop-light" style={{animationDelay:`${i*.3}s`}} cx={x} cy={i===3?42:i===2||i===4?39:i===1||i===5?32:24} r="4" fill="#f2cd80" />)}
      <g transform="translate(130 0)">
        <path d="M-33 137Q-36 85 0 85Q36 85 33 137" fill="#246b58"/><path d="M-12 90L0 104L12 90" fill="#edc878"/>
        <path d="M-21 62L-34 57L-27 76M21 62L34 57L27 76" fill="#edbd97"/><ellipse cy="68" rx="25" ry="27" fill="#f2c5a2"/>
        <path d="M-27 55Q-16 16 25 21L19 32Q2 23-7 48L28 55Z" fill="#2a7b62"/><path d="M-27 53Q0 44 28 53" fill="none" stroke="#e5bc70" strokeWidth="9"/><circle cx="24" cy="22" r="6" fill="#e5bc70"/>
        <circle cx="-9" cy="68" r="2.5" fill="#30222c"/><circle cx="9" cy="68" r="2.5" fill="#30222c"/><path d="M-6 80Q0 85 6 80" fill="none" stroke="#9f554b" strokeWidth="2" strokeLinecap="round"/>
        <g className="workshop-arm-left"><path d="M20 103L55 123" fill="none" stroke="#246b58" strokeWidth="16" strokeLinecap="round"/><circle cx="57" cy="124" r="8" fill="#f2c5a2"/></g>
      </g>
      <g transform="translate(470 0)">
        <path d="M-33 137Q-36 85 0 85Q36 85 33 137" fill="#9b3043"/><path d="M-12 90L0 104L12 90" fill="#edc878"/>
        <path d="M-21 62L-34 57L-27 76M21 62L34 57L27 76" fill="#dca57b"/><ellipse cy="68" rx="25" ry="27" fill="#e9b78e"/>
        <path d="M-28 55L-16 19Q15 20 28 55Z" fill="#a83748"/><path d="M-27 53Q0 44 28 53" fill="none" stroke="#e5bc70" strokeWidth="9"/><circle cx="-16" cy="19" r="6" fill="#e5bc70"/>
        <circle cx="-9" cy="68" r="2.5" fill="#30222c"/><circle cx="9" cy="68" r="2.5" fill="#30222c"/><path d="M-6 80Q0 85 6 80" fill="none" stroke="#9f554b" strokeWidth="2" strokeLinecap="round"/>
        <g className="workshop-arm-right"><path d="M-20 103L-55 123" fill="none" stroke="#9b3043" strokeWidth="16" strokeLinecap="round"/><circle cx="-57" cy="124" r="8" fill="#e9b78e"/></g>
      </g>
      <rect x="60" y="140" width="480" height="9" rx="4" fill="#b88a55"/><path d="M90 149V165M510 149V165" stroke="#775535" strokeWidth="8"/>
      <g className="workshop-parcel"><rect x="264" y="96" width="72" height="43" rx="4" fill="url(#workshop-gift)"/><rect x="260" y="91" width="80" height="11" rx="3" fill="#bf4352"/><path d="M300 92V139" stroke="#e9c67b" strokeWidth="9"/><path d="M300 92C263 70 283 65 300 92C317 65 337 70 300 92Z" fill="none" stroke="#e9c67b" strokeWidth="4"/></g>
      <g fill="#d9b36b"><rect x="196" y="119" width="33" height="20" rx="2"/><rect x="370" y="111" width="35" height="28" rx="2"/></g><path d="M212 119V139M387 111V139" stroke="#f8e6bc" strokeWidth="4"/>
    </svg>
  </div>;
}
