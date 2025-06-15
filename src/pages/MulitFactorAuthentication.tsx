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

import { EnrollMFA } from "@/components/material/EnrollMFA"
import { useAuth } from "@/middleware/AuthMiddleware"


const MulitFactorAuthentication = () => {

    const { user } = useAuth()
    return (
        <div>
            <p>Ehance Securiry</p>

            <p>{JSON.stringify(user?.data?.user?.factors)}</p>

            <EnrollMFA onCancelled={() => { }} onEnrolled={() => { }} />
        </div>
    )
}

export default MulitFactorAuthentication