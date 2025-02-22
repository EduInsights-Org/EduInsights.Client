import {
  useState,
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  useEffect,
} from "react";
import clsx from "clsx";

const VerificationInput = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  if (inputRefs.current.length === 0) {
    inputRefs.current = Array(6).fill(null);
  }

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (code[index] === "" && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newCode[index] = char;
      }
    });
    setCode(newCode);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((char) => char === "");
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  // Focus the first input on initial render
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto pt-6 pb-4">
      <div className="flex justify-between gap-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={clsx(
              "w-12 h-12",
              "text-center text-xl font-semibold text-light-font01 dark:text-font01",
              "ring-1 ring-inset ring-light-borderGray dark:ring-borderGray rounded-lg",
              "focus:outline-none focus:outline-1 focus:-outline-offset-1 focus:outline-light-font01 dark:focus:outline-font01",
              "bg-light-subBg dark:bg-subBg transition-colors"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default VerificationInput;
