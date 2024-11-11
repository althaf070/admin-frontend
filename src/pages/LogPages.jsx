import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../lib/serverurl";
import { Timeline } from "flowbite-react";

const LogPages = () => {
    const [logs, setLogs] = useState([]);
    
    const fetchAllLogs = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/logs`);
            setLogs(response.data.logs);
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    };

    useEffect(() => {
        fetchAllLogs();
    }, []);

    return (
        <div className="flex w-full min-h-screen bg-gray-800 text-white p-4">
            <Timeline className="w-full">
                {logs.length > 0 ? (
                    logs.map((log) => (
                        <Timeline.Item key={log._id}>
                            <Timeline.Point />
                            <Timeline.Content>
                                <Timeline.Time>
                                    {new Date(log.createdAt).toLocaleDateString()}
                                </Timeline.Time>
                                <Timeline.Title className="text-white">{log.service?.servicename || "Service"}</Timeline.Title>
                                <Timeline.Body className="text-gray-200">
                                    <p><strong>User:</strong> {log.users.username}</p>
                                    <p><strong>Status:</strong> {log.status}</p>
                                    <p><strong>provider:</strong> {log.providers.username}</p>
                                </Timeline.Body>
                            </Timeline.Content>
                        </Timeline.Item>
                    ))
                ) : (
                    <p>No logs available</p>
                )}
            </Timeline>
        </div>
    );
};

export default LogPages;
