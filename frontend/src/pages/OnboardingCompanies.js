import Nav from '../components/Nav'
import {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const OnboardingCompanies = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        comapny_id: cookies.CompanyId,
        company_name: "",
        company_base: "servBased",
        job_offer_url: "",
        job_description: "",
        matches: []

    })

    let navigate = useNavigate()

    const handleSubmitCompanies = async (ec) => {
        console.log("Submitted")
        ec.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', {formData})
            console.log(response)
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
        
    }
    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

            <div className="onboarding-companies">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmitCompanies}>
                    <section>
                        <label htmlFor="company_name">Company Name</label>
                        <input
                            id="company-name"
                            type='text'
                            name="company-name"
                            placeholder="Company Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Company Base</label>

                        <div className="multiple-input-container">
                            <input
                                id="company-base"
                                type="radio"
                                name="company-base"
                                value="prodBased"
                                onChange={handleChange}
                                checked={formData.company_base=== "prodBased"}
                            />
                            <label htmlFor="company-base">Product Based Company</label>
                            <input
                                id="service-based-interest"
                                type="radio"
                                name="company-base"
                                value="servBased"
                                onChange={handleChange}
                                checked={formData.company_base === "servBased"}
                            />
                            <label htmlFor="service-based-interest">Service Based Company</label>
                            <input
                                id="both-interest"
                                type="radio"
                                name="company-base"
                                value="both"
                                onChange={handleChange}
                                checked={formData.company_base === "both"}
                            />
                            <label htmlFor="both-interest">Both</label>

                        </div>

                        <label htmlFor="job_offer_url">Job Offer</label>
                        <input
                            type="url"
                            name="job-offer"
                            id="job-offer"
                            onChange={handleChange}
                            required={true}
                            placeholder="Add the job offer link ..."
                        />

                        <label htmlFor="job_description">About the Job</label>
                        <input
                            id="job-description"
                            type="textarea"
                            name="job-description"
                            required={true}
                            placeholder="8 hour deskjob"
                            value={formData.about}
                            onChange={handleChange}
                        />

                        <input type="submit"/>
                    </section>
                </form>
            </div>
        </>
    )
}
export default OnboardingCompanies