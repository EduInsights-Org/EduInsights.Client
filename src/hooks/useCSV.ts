import { useState } from "react";

interface UseCSVReturn {
  csvData: string[][] | null;
  usersList: CSVHeaderType[] | null;
  handleCSVSelect: (
    event: React.ChangeEvent<HTMLInputElement>,
    instituteId: string
  ) => void;
  error: boolean | null;
  fileName: string;
}

enum CSVHeader {
  FNAME = "firstName",
  LNAME = "lastName",
  UNAME = "userName",
  INUMBER = "indexNumber",
  EMAIL = "email",
  INSTITUTE_ID = "instituteId",
  BATCH_ID = "batchId",
  ROLE = "role",
}

interface CSVHeaderType {
  firstName: string;
  lastName: string;
  userName: string;
  indexNumber: string;
  email: string;
  instituteId: string;
  batchId: null;
  role: string;
  password: string;
}

const useCSV = (): UseCSVReturn => {
  const [csvData, setCSVData] = useState<string[][] | null>(null);
  const [usersList, setUsersList] = useState<CSVHeaderType[] | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<boolean | null>(null);

  const handleCSVSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    instituteId: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      readCSVFile(file, instituteId);
    }
  };

  const readCSVFile = (file: File, instituteId: string) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsedData: string[][] = parseCSVData(text);

      if (!validateCSVData(parsedData)) {
        const csvBodyData = parsedData.slice(1, parsedData.length - 1);
        const r: CSVHeaderType[] = csvBodyData.map((row) => {
          return {
            firstName: row[0],
            lastName: row[1],
            userName: row[2],
            indexNumber: row[3],
            email: row[4],
            role: row[5],
            instituteId: instituteId,
            batchId: null,
            password: "123321",
          };
        });

        setUsersList(r);
      }

      setCSVData(parsedData);
    };

    reader.onerror = () => {
      console.error("Error reading file");
      setError(true);
    };

    reader.readAsText(file);
  };

  const parseCSVData = (data: string): string[][] => {
    const rows = data.split("\n").map((row) => row.split(","));
    return rows;
  };

  const validateCSVData = (parsedData: string[][]): boolean => {
    if (parsedData[0][0] !== CSVHeader.FNAME) {
      setError(true);
      return true;
    } else if (parsedData[0][1] !== CSVHeader.LNAME) {
      setError(true);
      return true;
    } else if (parsedData[0][2] !== CSVHeader.UNAME) {
      setError(true);
      return true;
    } else if (parsedData[0][3] !== CSVHeader.INUMBER) {
      setError(true);
      return true;
    } else if (parsedData[0][4] !== CSVHeader.EMAIL) {
      setError(true);
      return true;
    } else if (parsedData[0][5] !== CSVHeader.ROLE + "\r") {
      setError(true);
      return true;
    }

    setError(false);
    return false;
  };

  return { csvData, usersList, error, fileName, handleCSVSelect };
};

export default useCSV;
