// Copyright 2025 chenterphai
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import supabase from "@/utils/supabase"
import { useEffect, useState } from "react"
import AuthMFA from "./AuthMFA"


function AppWithMFA() {
    const [readyToShow, setReadyToShow] = useState(false)
    const [showMFAScreen, setShowMFAScreen] = useState(false)

    useEffect(() => {
        ; (async () => {
            try {
                const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
                if (error) {
                    throw error
                }

                console.log(data)

                if (data.nextLevel === 'aal2' && data.nextLevel !== data.currentLevel) {
                    setShowMFAScreen(true)
                }
            } finally {
                setReadyToShow(true)
            }
        })()
    }, [])

    if (readyToShow) {
        if (showMFAScreen) {
            return <AuthMFA />
        }

        return <div>Heelo</div>
    }

    return <></>
}

export default AppWithMFA