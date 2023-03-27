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

export function useContacts(): {
    contacts: any[],
    isLoading: boolean
} {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getTasks = (): void => {
            const {tasks} = tasksDB;
            setContacts(tasks);
            setIsLoading(false);
        }
        getTasks();
      }, []);
    return { contacts, isLoading };
}

export function useCustomers(): {
    customers: any[],
    isLoading: boolean
} {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getTasks = (): void => {
            const {tasks} = tasksDB;
            setCustomers(tasks);
            setIsLoading(false);
        }
        getTasks();
      }, []);
    return { customers, isLoading };
}

export function useMail(inbox:boolean): {
    mails: any[],
    isLoading: boolean
} {
    const [mails, setMails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getTasks = (): void => {
            const {tasks} = tasksDB;
            setMails(tasks);
            setIsLoading(false);
        }
        getTasks();
      }, []);
    return { mails, isLoading };
}