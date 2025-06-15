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

import supabase from "@/utils/supabase";
import { useState } from "react";


function AuthMFA() {
    const [verifyCode, setVerifyCode] = useState('')
    const [error, setError] = useState('')

    const onSubmitClicked = () => {
        setError('')
            ; (async () => {
                const factors = await supabase.auth.mfa.listFactors()
                if (factors.error) {
                    throw factors.error
                }

                const totpFactor = factors.data.totp[0]

                if (!totpFactor) {
                    throw new Error('No TOTP factors found!')
                }

                const factorId = totpFactor.id

                const challenge = await supabase.auth.mfa.challenge({ factorId })
                if (challenge.error) {
                    setError(challenge.error.message)
                    throw challenge.error
                }

                const challengeId = challenge.data.id

                const verify = await supabase.auth.mfa.verify({
                    factorId,
                    challengeId,
                    code: verifyCode,
                })
                if (verify.error) {
                    setError(verify.error.message)
                    throw verify.error
                }
            })()
    }

    return (
        <>
            <div>Please enter the code from your authenticator app.</div>
            {error && <div className="error">{error}</div>}
            <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.trim())}
            />
            <input type="button" value="Submit" onClick={onSubmitClicked} />
        </>
    )
}

export default AuthMFA