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
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Link } from "react-router"
import { Alert, AlertTitle } from "../ui/alert"
import { AlertCircleIcon } from "lucide-react"

/**
 * EnrollMFA shows a simple enrollment dialog. When shown on screen it calls
 * the `enroll` API. Each time a user clicks the Enable button it calls the
 * `challenge` and `verify` APIs to check if the code provided by the user is
 * valid.
 * When enrollment is successful, it calls `onEnrolled`. When the user clicks
 * Cancel the `onCancelled` callback is called.
 */
export function EnrollMFA({
    onEnrolled,
    onCancelled,
}: {
    onEnrolled: () => void
    onCancelled: () => void
}) {
    const [factorId, setFactorId] = useState('')
    const [qr, setQR] = useState('') // holds the QR code image SVG
    const [verifyCode, setVerifyCode] = useState('') // contains the code entered by the user
    const [error, setError] = useState('') // holds an error message

    const onEnableClicked = () => {
        setError('')
            ; (async () => {
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

                onEnrolled()
            })()
    }

    useEffect(() => {
        ; (async () => {
            const { data, error } = await supabase.auth.mfa.enroll({
                factorType: 'totp',
            })
            if (error) {
                throw error
            }

            setFactorId(data.id)

            // Supabase Auth returns an SVG QR code which you can convert into a data
            // URL that you can place in an <img> tag.
            setQR(data.totp.qr_code)
        })()
    }, [])

    return (
        <>
            <div>
                <p className="text-2xl font-semibold text-neutral-800">Multi-Factor Authentication (TOTP)</p>
                <div className="flex gap-2 mt-3 border rounded">
                    <img src={qr} />
                    <div className="p-2.5">
                        <p className="text-base font-semibold">How to:</p>
                        <ol>
                            <li className="text-sm">1. Download <Link className="text-blue-500" to="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&pcampaignid=web_share" target="_blank">Google Authenticator</Link> App </li>
                            <li className="text-sm">2. Open App and Scan the left OR Code.</li>
                            <li className="text-sm">3. Enter 6 digits code in the following and click ENABLE!</li>
                        </ol>

                        <div className="mt-4">
                            <div>
                                <Input
                                    type="text"
                                    value={verifyCode}
                                    onChange={(e) => setVerifyCode(e.target.value.trim())}
                                    placeholder="Enter code here"
                                />
                                {error && (
                                    <Alert className="border-0 px-0 pb-0" variant='destructive'>
                                        <AlertCircleIcon />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}
                            </div>
                            <div className="flex items-center gap-x-2 mt-3">
                                <Button type="button" onClick={onEnableClicked} >Enable</Button>
                                <Button type="button" variant='outline' onClick={onCancelled} >Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}