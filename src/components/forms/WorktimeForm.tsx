interface Props {
    data: any[]
    onFetch: () => void
}

const WorktimeForm = ({ data, onFetch }: Props) => (
    <div>
        <button onClick={onFetch} className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Fetch Data
        </button>
        <ul className="space-y-2">
            {data.map((entry, index) => (
                <li key={index} className="p-3 border rounded">
                    Project: {entry.project.name} | Hours: {entry.hours} | Rate: ${entry.task.billable_rate} | Amount: $
                    {entry.hours * entry.task.billable_rate}
                </li>
            ))}
        </ul>
    </div>
)

export default WorktimeForm
