import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal.js"
import {useState} from 'react'
import {useCookies} from "react-cookie"
import AuthModalCompanies from "../components/AuthModalCompanies.js"
import OnboardingCompanies from './OnboardingCompanies'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    const [showModalCompanies, setShowModalCompanies] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [isSignUpCompanies, setIsSignUpCompanies] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken
    const authTokenCompanies = cookies.AuthTokencompany

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    const handleClickCompanies = () => {
        if (authTokenCompanies) {
            removeCookie('CompanyId', cookies.CompanyId)
            removeCookie('AuthTokenCompany', cookies.AuthTokenCompany)
            window.location.reload()
            return
        }
        setShowModalCompanies(true)
        setIsSignUpCompanies(true)
    }

    return (
        <div className="overlay">
            <Nav
                authToken={authToken}
                authTokenCompanies={authTokenCompanies}
                minimal={false}
                setShowModal={setShowModal}
                setShowModalCompanies={setShowModalCompanies}
                showModal={showModal}
                showModalCompanies={showModalCompanies}
                setIsSignUp={setIsSignUp}
                setIsSignUpCompanies={setIsSignUpCompanies}
            />
            <div className="home">
                <h1 className="primary-title">Wings®</h1>
                <button className="primary-button"  onClick={handleClick}>
                    {authToken ? 'Signout' : 'For Users'}
                </button>
                <p> </p>
                <button className="primary-button" onClick={handleClickCompanies}>
                    {authTokenCompanies ? 'Signout' : 'For Companies'}
                </button>


                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}
                {showModalCompanies && (<AuthModalCompanies setShowModalCompanies={setShowModalCompanies} isSignUpCompanies={isSignUpCompanies}/>
                )}
            </div>
        </div>
    )

}
export default Home
