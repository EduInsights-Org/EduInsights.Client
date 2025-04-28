import { useState, useCallback } from "react";

export interface CSVConfig<T> {
  headers: Record<keyof T, string>;
  requiredHeaders: (keyof T)[];
  defaultValues: Partial<T>;
  validateRow?: (row: T) => boolean;
}

interface UseCSVReturn<T> {
  csvData: string[][] | null;
  parsedData: T[] | null;
  handleCSVSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  fileName: string;
  resetCSVFile: () => void;
  isValid: boolean;
}

const useCSV = <T extends Record<string, any>>(
  config: CSVConfig<T>
): UseCSVReturn<T> => {
  const [csvData, setCSVData] = useState<string[][] | null>(null);
  const [parsedData, setParsedData] = useState<T[] | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  const resetCSVFile = useCallback(() => {
    setCSVData(null);
    setParsedData(null);
    setError(null);
    setIsValid(false);
    setFileName("");
  }, []);

  const validateHeaders = useCallback(
    (headers: string[]): boolean => {
      const requiredHeaders = config.requiredHeaders.map(
        (header) => config.headers[header]
      );

      const missingHeaders = requiredHeaders.filter(
        (header) => !headers.includes(header)
      );

      if (missingHeaders.length > 0) {
        setError(`Missing required headers: ${missingHeaders.join(", ")}`);
        return false;
      }

      return true;
    },
    [config]
  );

  const parseRow = useCallback(
    (headers: string[], row: string[]): T => {
      const rowData: Partial<T> = { ...config.defaultValues };

      // Map each expected field to its CSV column
      Object.entries(config.headers).forEach(([field, headerName]) => {
        const columnIndex = headers.indexOf(headerName);
        if (columnIndex !== -1 && row[columnIndex] !== undefined) {
          const value = row[columnIndex].replace(/\r/g, "").trim();
          rowData[field as keyof T] = value as any;
        }
      });

      return rowData as T;
    },
    [config]
  );

  const readCSVFile = useCallback(
    (file: File) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          if (!text) {
            throw new Error("Empty file content");
          }

          const rows = text.split("\n").filter((row) => row.trim() !== "");
          const parsedData = rows.map((row) => {
            // Handle quoted values that might contain commas
            const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            return matches
              ? matches.map((cell) => cell.replace(/^"|"$/g, "").trim())
              : [];
          });

          if (parsedData.length < 2) {
            throw new Error(
              "CSV file must contain at least a header and one data row"
            );
          }

          const headers = parsedData[0];
          const isValidHeaders = validateHeaders(headers);

          if (!isValidHeaders) {
            setIsValid(false);
            setCSVData(parsedData);
            return;
          }

          const bodyData = parsedData.slice(1);
          const parsedRows: T[] = [];

          for (const row of bodyData) {
            try {
              const parsedRow = parseRow(headers, row);

              // Validate the row if validation function is provided
              if (config.validateRow) {
                if (!config.validateRow(parsedRow)) {
                  throw new Error(
                    `Invalid row data: ${JSON.stringify(parsedRow)}`
                  );
                }
              }

              parsedRows.push(parsedRow);
            } catch (rowError) {
              console.warn(
                `Skipping invalid row: ${(rowError as Error).message}`
              );
            }
          }

          setCSVData(parsedData);
          setParsedData(parsedRows);
          console.log("Parsed CSV data:", parsedRows);
          setIsValid(true);
          setError(null);
        } catch (err) {
          console.error("Error processing CSV:", err);
          setError((err as Error).message);
          setIsValid(false);
        }
      };

      reader.onerror = () => {
        setError("Error reading file");
        setIsValid(false);
      };

      reader.readAsText(file);
    },
    [validateHeaders, parseRow, config]
  );

  const handleCSVSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      resetCSVFile();
      setFileName(file.name);

      if (!file.name.endsWith(".csv")) {
        setError("Please upload a CSV file");
        return;
      }

      readCSVFile(file);
    },
    [readCSVFile, resetCSVFile]
  );

  return {
    csvData,
    parsedData,
    handleCSVSelect,
    error,
    fileName,
    resetCSVFile,
    isValid,
  };
};

export default useCSV;
