import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getNotes, saveNote, deleteNote } from '../actions/notesAction'
import NoteCard from './NoteCard'
import { googleLogin, facebookLogin, passwordLogin } from '../actions/userAction'
import { auth } from '../firebase'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account : '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  //liftcycle
  componentDidMount(){
    this.props.getNotes();
  }

  // handle change
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // hangle sumit
  handleSubmit(e){
    e.preventDefault()
    const note = {
      account: this.state.account,
      password: this.state.password
    }
    passwordLogin(this.state.account, this.state.password);
    this.props.saveNote(note);
    this.setState({
      account: '',
      password: ''
    })
  }

  // render notes
  renderNotes(){
    return _.map(this.props.notes, (note, key) => {
      return (
        <NoteCard className="panel panel-default " key = {key}>
          <p>key: {key}</p>
          <p>帳號：{note.account}</p>
          <p>密碼：{note.password}</p>
          <button className='btn btn-danger btn-xs center-block' onClick={()=>this.props.deleteNote(key)}>Delete</button>
        </NoteCard>
      )
    })
  }

  render() {
    return (
      <div className="container-fluid " >
        <div className="panel panel-default " >
          <div className="panel-body" >
            <div className='row'>
              <div className = 'col-sm-6 col-sm-offset-3'>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                    <div 
                      className='col-sm-12 disabled' 
                      style={{'border':'solid 1px', 'margin':'0px 0px 30px 0px', 'padding': '10px','textAlign': 'center'}}
                      >登入頁 / Sign-in</div>
                  </div>
                  <div className='form-group'>
                    <input
                      onChange={this.handleChange}
                      value={this.state.account}
                      type='email'
                      name='account'
                      className='form-control no-border'
                      placeholder='信箱 / E-mail'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <input
                        onChange={this.handleChange}
                        value={this.state.password}
                        type='password'
                        name='password'
                        className='form-control no-border'
                        placeholder='密碼 / Password'
                        required
                      />
                  </div>
                  <div className='form-group'>
                    <button className='btn btn-primary col-sm-12 center-block'>登入</button>
                  </div>
                </form>
                <div className='form-group'>
                  <button className='btn btn-danger col-sm-12 center-block'>登出</button>
                </div>
                <br/>
                <div>
                  <button 
                    className='btn btn-danger col-sm-12 center-block' 
                    onClick={this.props.googleLogin}
                    >Google 登入 / Log-in with Google</button>
                </div>
                <br/>
                <div>
                  <button 
                    className='btn btn-primary col-sm-12 center-block' 
                    onClick={this.props.facebookLogin}
                    >FaceBook 登入 / Log-in with FaceBook</button>
                </div>
                <br/>
                {this.renderNotes()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    notes: state.notes
  }
}

export default connect(mapStateToProps, {getNotes, saveNote, deleteNote, googleLogin, facebookLogin, passwordLogin}) (App);
