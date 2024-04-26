import { useEffect, useState } from "react"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"

export const useGetCallById = (id: string | string[]) => 
    {
        const [call, setCall] = useState<Call>()
        const [isCallLoading, setIsCallLoading] = useState (true)

        const client = useStreamVideoClient();

        useEffect(() => {
            if(!client) return;

            const loadCall = async () => {
                const { calls } = await client.queryCalls({

                    filter_conditions: {
                        id: {
                            /* this code be a error check later */
                            /* remove it as a property leave as variable if so */
                            eq: id
                        }
                    }
                })

                if(calls.length > 0) setCall(calls[0]);

                setIsCallLoading(false);
            }

            loadCall();
        }, [client , id]);

        return { call , isCallLoading };
    }