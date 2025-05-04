import { useContext } from "react";
import { DataContext } from "@utils/context";
import { formatNumber } from "@utils/format";
interface Props {
  onFetch: () => void;
}

const WorktimeForm = ({ onFetch }: Props) => {
  const { invoice, worktime } = useContext(DataContext);
  const rate = invoice?.rate ?? 0;
  return (
    <div>
      <button
        onClick={onFetch}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Get Worktime
      </button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-left">PROJECT / TASK</th>
            <th className="text-left">CLIENT</th>
            <th className="text-right">HOURS</th>
            <th className="text-right">RATE</th>
            <th className="text-right">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {worktime.map((project, index) => (
            <tr key={index}>
              <td>{project.project_name}</td>
              <td>{project.client_name}</td>
              <td className="text-right">
                {formatNumber(project.total_hours, 2, false, "0.00")}
              </td>
              <td className="text-right">
                {formatNumber(rate, 2, true, "0.00")}
              </td>
              <td className="text-right">
                {" "}
                {formatNumber(project.total_hours * rate, 2, true, "0.00")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorktimeForm;
