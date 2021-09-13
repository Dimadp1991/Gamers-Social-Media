import axios from '../services/axios.config'
import { React, useState, useEffect } from 'react'
import './NewRoomForm.css'
import $ from 'jquery'
export default function NewRoomForm() {


    const [AllGamesList, SetAllGamesList] = useState([])
    function CreateRoomclicked() {




        const new_room = {
            name: $('#room_name').val(),
            game: $('select[name=gameSelector] option').filter(':selected').val(),
            platform: $('select[name=PlatformSelector] option').filter(':selected').val(),
            description: $('#game_desc_ta').val()
        }
        // console.log(new_room)

        axios.post('/room/', new_room).then((res) => {
            // return ReactDOM.createPortal(`/room/${res.data}`, this.containerEl)
            window.location = `/room/${res.data}`
            $('#new_room_form_error').text('')
        }).catch(() => {
            if (new_room.name == '') {
                $('#new_room_form_error').text('Room Name is Missing \n Please Enter Room Name')
            }


        })


    }

    function GetAllGamesOption() {

        axios.get('/games/list?offset=0&length=100').then((res) => {
            //console.log(res.data)
            for (let i = 0; i < res.data.length; i++) {
                const game = res.data[i]

                SetAllGamesList(AllGamesList =>
                    [...AllGamesList, <option key={i} className="form-control" value={game.name} >{game.name}</option>])

            }

        })

    }



    useEffect(() => {

        GetAllGamesOption()

    }, [])

    /* Pc|Xbox|Playstation|Android|Apple|Psp */

    return (
        <div>
            <div className="container-md" id="new_room_form">
                <div className="col form-group" id="newRoomFormdiv">
                    <input id="room_name" className="form-control" type="text" placeholder="room name" />
                    <div>
                        <select name="gameSelector" id="game_selector_id" className="form-control">
                            {AllGamesList}
                        </select>
                    </div>
                    <div>
                        <select name="PlatformSelector" id="platform_selector" className="form-control">
                            <option className="form-control" value={'Pc'} >Pc</option>
                            <option className="form-control" value={'Xbox'} >Xbox</option>
                            <option className="form-control" value={'Playstation'} >Playstation</option>
                            <option className="form-control" value={'Android'} >Android</option>
                            <option className="form-control" value={'Apple'} >Apple</option>
                            <option className="form-control" value={'linux'} >linux</option>
                            <option className="form-control" value={'Psp'} >Psp</option>
                        </select>
                    </div>
                    <textarea className="form-control" id="game_desc_ta" />
                    <br />
                    <button className="btn-outline-success form-control" onClick={CreateRoomclicked}>Create Room</button>
                    <div id="new_room_form_error"></div>
                </div>

            </div>


        </div>
    )
}
