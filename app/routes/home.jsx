import { Main } from "../display";

export function meta() {
  return [
    { title: "Sudoku Solver" },
    { name: "description", content: "Brute-force solve sudoku problems" },
  ];
} 

export default function Home() {
  return <Main />;
}
