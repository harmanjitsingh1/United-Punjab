import { useState } from "react";

export default function GurmukhiSeriesPage() {

  const [words, setWords] = useState([
    { number: 1, english: "Debate",  punjabi: "ਵਾਦ ਵਿਵਾਦ", hindi: "बहस", },
    { number: 2, english: "Demand",  punjabi: "ਉਲਬ", hindi: "मांग", },
    { number: 3, english: "Declare", punjabi: "ਪ੍ਰਕਾਸ਼ਤ ਕਰਨਾ", hindi: "घोषणा करना" },
    { number: 4, english: "Deft",  punjabi: "ਕੁਸ਼ਲ, ਤਜਰਬੇਕਾਰ", hindi: "चतुर", },
    // add more...
  ]);

  return (
    <section id="gurmukhi" className="max-w-6xl mx-auto md:px-6 px-3 py-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h3 className="text-4xl font-extrabold text-primary mb-4">
          Gurmukhi Series
        </h3>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed">
          Learn Punjabi words with Hindi & English meanings. Updated daily.
        </p>
      </div>

      {/* Words Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full border-collapse">
          <thead className="bg-primary text-white text-lg">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">English</th>
              <th className="py-3 px-4 text-left">ਪੰਜਾਬੀ</th>
              <th className="py-3 px-4 text-left">हिंदी</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word, idx) => (
              <tr
                key={idx}
                className="odd:bg-gray-50 even:bg-white dark:odd:bg-zinc-800 dark:even:bg-zinc-900 hover:bg-[#F57517]/10 transition"
              >
                <td className="py-3 px-4 font-medium">{word.number}</td>
                <td className="py-3 px-4">{word.english}</td>
                <td className="py-3 px-4">{word.punjabi}</td>
                <td className="py-3 px-4">{word.hindi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
