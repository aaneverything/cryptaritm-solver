import React, { useState } from "react";

function CryptarithmSolver() {
  const [term1, setTerm1] = useState("");
  const [term2, setTerm2] = useState("");
  const [result, setResult] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [error, setError] = useState("");

  function solveCryptarithm(term1, term2, result) {
    // Menggabungkan semua term untuk mendapatkan huruf unik
    let allTerms = term1 + term2 + result;
    let uniqueLetters = [...new Set(allTerms.replace(/[^A-Z]/g, ""))];

    // Fungsi untuk mengevaluasi sebuah term
    function evaluateTerm(term, mapping) {
      return parseInt(
        term
          .split("")
          .map((char) => mapping[char])
          .join("")
      );
    }

    // Fungsi untuk memeriksa apakah solusi valid
    function isValidSolution(mapping) {
      let leftValue =
        evaluateTerm(term1, mapping) + evaluateTerm(term2, mapping);
      let rightValue = evaluateTerm(result, mapping);
      return leftValue === rightValue;
    }

    let solutions = [];

    // Fungsi rekursif untuk mencoba semua kemungkinan
    function tryAllCombinations(index, mapping) {
      if (index === uniqueLetters.length) {
        if (isValidSolution(mapping)) {
          solutions.push({ ...mapping });
        }
        return;
      }

      let letter = uniqueLetters[index];
      for (let digit = 0; digit <= 9; digit++) {
        if (Object.values(mapping).includes(digit)) continue;
        if (
          (term1[0] === letter ||
            term2[0] === letter ||
            result[0] === letter) &&
          digit === 0
        )
          continue; // Digit pertama tidak boleh 0

        mapping[letter] = digit;
        tryAllCombinations(index + 1, mapping);
        delete mapping[letter];
      }
    }

    tryAllCombinations(0, {});

    return solutions;
  }

  function evaluateTermWithSolution(term, solution) {
    return parseInt(
      term
        .split("")
        .map((char) => solution[char])
        .join("")
    );
  }

  const handleSolve = () => {
    setError("");
    if (!term1 || !term2 || !result) {
      setError("Semua input harus diisi");
      return;
    }

    const letterPattern = /^[A-Z]+$/;
    if (
      !letterPattern.test(term1) ||
      !letterPattern.test(term2) ||
      !letterPattern.test(result)
    ) {
      setError("Input hanya boleh berisi huruf kapital");
      return;
    }

    const newSolutions = solveCryptarithm(term1, term2, result);
    setSolutions(newSolutions);
    if (newSolutions.length === 0) {
      setError("Tidak ditemukan solusi");
    }
  };

  return (
    <div className="cryptarithm-solver">
      <div className="container mt-20 ssm:mx-auto flex flex-col">
        <h1 className="text-4xl font-bold ssm:text-2xl">Cryptarithm Solver</h1>
        <p className="mt-4 ssm:text-md">
          Menyelesaikan puzzle cryptarithm secara otomatis! karena check khodam
          biasa bgt cuma ngerandom doang.
        </p>
        <div className="input-group flex flex-col items-center justify-center gap-5 mt-10">
          <input
            className="input border-[1px] border-gray-300 rounded-xl w-[30rem] ssm:w-[20rem] text-right pr-4 h-16 text-2xl ssm:h-16 ssm:text-lg "
            value={term1}
            onChange={(e) => setTerm1(e.target.value.toUpperCase())}
            placeholder="Suku pertama"
          />
          <input
            className="input border-[1px] border-gray-300 rounded-xl w-[30rem] ssm:w-[20rem] ssm:text-lg text-right pr-4 h-16 text-2xl sm:h-20 sm:text-2xl "
            value={term2}
            onChange={(e) => setTerm2(e.target.value.toUpperCase())}
            placeholder="Suku kedua"
          />
          <div className="flex items-center justify-center text-3xl gap-3">
            <p className="text-gray-400">+</p>
            <hr className="border-2 border-gray-300 w-[32rem]  ssm:w-72" />
          </div>

          <input
            className="input border-[1px] border-gray-300 rounded-xl w-[30rem] ssm:w-[20rem] ssm:text-lg text-right pr-4 h-16 text-2xl sm:h-20 sm:text-2xl"
            value={result}
            onChange={(e) => setResult(e.target.value.toUpperCase())}
            placeholder="Hasil"
          />
        </div>
        <div className="flex flex-row-reverse mr-80 ssm:mr-0 sm:mr-14 md:mr-40 lg:mr-64">
          <button
            className="bg-green-800 text-white text-md p-3 rounded-xl m-5  "
            onClick={handleSolve}
          >
            Solve
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {solutions.length > 0 && (
          <div className="solutions">
            {solutions.map((solution, index) => (
              <div key={index} className="solution">
                <div className="input-group flex flex-col items-center justify-center gap-5">
                  <div className="input border-[1px] border-gray-300 rounded-xl w-[30rem] ssm:w-[20rem] ssm:text-lg text-right p-4 h-16 text-2xl sm:h-20 sm:text-2xl">
                    {evaluateTermWithSolution(term1, solution)}
                  </div>
                  <div className="input border-[1px] border-gray-300 rounded-xl w-[30rem] ssm:w-[20rem] ssm:text-lg text-right p-4 h-16 text-2xl sm:h-20 sm:text-2xl">
                    {evaluateTermWithSolution(term2, solution)}
                  </div>
                  <div className="input border-[1px] border-gray-300 rounded-xl w-[30rem] ssm:w-[20rem] ssm:text-lg text-right p-4 h-16 text-2xl sm:h-20 sm:text-2xl">
                    {evaluateTermWithSolution(result, solution)}
                  </div>
                  <p className="text-xs text-gray-300">this project inspired by mas fajrul falah</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CryptarithmSolver;
