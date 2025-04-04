import { useAppDispatch, useAppSelector } from "@/slices/store";
import { getAllSubjects } from "@/slices/subjectSlice";
import { useEffect } from "react";

const Subjects = () => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector((state) => state.subject.subjects);

  useEffect(() => {
    dispatch(getAllSubjects());
  }, []);
  return <div>Subjects</div>;
};

export default Subjects;
