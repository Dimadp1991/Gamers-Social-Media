
import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import MyRoomsComponent from '../components/MyRoomsComponent'
import axios from '../services/axios.config'
import { selectUser } from '../state/userSlice'
import './RoomsPage.css'
export default function RoomsPage() {


    const { user } = useSelector(selectUser)
    const [all_profiles_list, set_profiles_list] = useState([])
        //const [FriendFocused, SetFriendFocused] = useState(null)
    const [userProfile, SetuserProfile] = useState(null)

    const [dataFetched, SetdataFetch] = useState(false)



    const fetchData = async () => {
        await axios.get(`profiles/profile/${user.id}`).then((res) => {
            //console.log(res.data[0])
            SetuserProfile(res.data[0])

        })

        await axios.get('/profiles/all_profiles').then((all_profiles) => {
            set_profiles_list(all_profiles.data)
            //console.log(all_profiles_list)
        })

        SetdataFetch(true)

    }



    useEffect(() => {
        fetchData()
        // eslint-disable-next-line 
    }, [dataFetched])



    /* Pc|Xbox|Playstation|Android|Apple|Psp */

    return (
        /*        <div style={{ height: '100vh' }}>
       
                   <div className="container-md">
                       <RiChatNewLine id="newRoomForm_btn" data-tip="Create New Room" onClick={() => setShownewRoomForm(!shownewRoomFormResults)}>Create New Room</RiChatNewLine>
                       <ReactTooltip />
                       {shownewRoomFormResults ? <NewRoomForm /> : null}
       
                   </div>
       
                   <div className="container-md ">
       
                       <MyRoomsComponent Profiles_RC={all_profiles_list} MyProfile_RC={userProfile} />
       
       
                   </div>
       
               </div > */
        <div className="OutShell">
            <div className="container-fluid bar mx-auto text-center">
                <div style={{ position: 'relative', left: '0', right: '0', zIndex: '999' }} className=""><img src="images/rooms_queen.png" /></div>
            </div>
            <div className="container">

                        <ReactTooltip />

                        <MyRoomsComponent Profiles_RC={all_profiles_list} MyProfile_RC={userProfile} />

                        {/*    <RiChatNewLine id="newRoomForm_btn" data-tip="Create New Room" onClick={() => setShownewRoomForm(!shownewRoomFormResults)}>Create New Room</RiChatNewLine> */}
                        {/*   <div id="newRoomForm_btn" data-tip="Create New Room" onClick={() => setShownewRoomForm(!shownewRoomFormResults)}><RoomCard game="" img="images/addnewroom.png" /></div>
                        */}
            </div>
        </div>
    )
}
