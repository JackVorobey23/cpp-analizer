import axios from "axios";

export const GetCodeErrors = async (code: string, setErrorInfo: React.Dispatch<React.SetStateAction<{
    status: string;
    compile_output: string;
} | null>>) => {

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': import.meta.env.VITE_JUDGE_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
            language_id: 54,
            source_code: code
        }
    };
    let token = "";

    try {
        const response = await axios.request(options);
        console.log(response.data);
        token = response.data.token;
        console.log(response.data.token);
    } catch (error) {
        console.error(error);
    }

    const getOptions = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_JUDGE_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };
    try {
        setTimeout(async () => {
            console.log(token);
            const response = await axios.request(getOptions);
            const data = response.data;
            const errorInfo = {
                status: data.status.description,
                compile_output: atob(data.compile_output)
            }
            console.log(response.data);
            console.log(errorInfo);
            setErrorInfo(errorInfo);
            return errorInfo;
        }, 5000)
    }
    catch (err) {
        console.log(err);
    }
}