import { useEffect, useState } from "react";
import tasksDB from "../data/tasks/tasks.json";

export function useTasks(): {
    tasks: any[],
    isLoading: boolean
} {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getTasks = (): void => {
            const {tasks} = tasksDB;
            setTasks(tasks);
            setIsLoading(false);
        }
        getTasks();
      }, []);
    return { tasks, isLoading };
}