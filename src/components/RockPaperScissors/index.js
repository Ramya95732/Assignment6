import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import GameOptions from '../GameOptions'

import {
  AppContainer,
  ResultContainer,
  OptionsContainer,
  Option,
  ScoreContainer,
  ScorePhase,
  ScoreNumber,
  GameViewContainer,
  GameOptionsList,
  PopupContainer,
  TriggerButton,
  CloseButton,
  PopupImage,
  PopupBody,
  GameResultViewContainer,
  SelectedOptionsContainer,
  GameUserOptionContainer,
  GameParticipantText,
  GameParticipantChoiceImage,
  ResultText,
  PlayAgainBtn,
} from './styledComponents'

const gameStatusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
}

class RockPaperScissors extends Component {
  state = {
    score: 0,
    gameStatus: gameStatusConstants.inProgress,
    userChoice: '',
    gameChoice: '',
  }

  onClickSetUserChoice = id => {
    this.setState(
      {userChoice: id, gameChoice: this.getGameChoice()},
      this.evaluateGame,
    )
  }

  onClickGoToGameView = () => {
    this.setState({gameStatus: gameStatusConstants.inProgress})
  }

  getGameChoice = () => {
    const {choicesList} = this.props
    const gameChoicesList = choicesList.map(choice => choice.id)
    const randomIndex = Math.floor(Math.random() * 3)
    return gameChoicesList[randomIndex]
  }

  evaluateGame = () => {
    const {userChoice, gameChoice} = this.state

    if (userChoice === gameChoice) {
      this.setState({gameStatus: gameStatusConstants.draw})
    } else if (userChoice === 'ROCK') {
      if (gameChoice === 'SCISSORS') {
        this.setState(preState => ({
          gameStatus: gameStatusConstants.win,
          score: preState.score + 1,
        }))
      } else {
        this.setState(preState => ({
          gameStatus: gameStatusConstants.lost,
          score: preState.score - 1,
        }))
      }
    } else if (userChoice === 'PAPER') {
      if (gameChoice === 'ROCK') {
        this.setState(preState => ({
          gameStatus: gameStatusConstants.win,
          score: preState.score + 1,
        }))
      } else {
        this.setState(preState => ({
          gameStatus: gameStatusConstants.lost,
          score: preState.score - 1,
        }))
      }
    } else if (userChoice === 'SCISSORS') {
      if (gameChoice === 'PAPER') {
        this.setState(preState => ({
          gameStatus: gameStatusConstants.win,
          score: preState.score + 1,
        }))
      } else {
        this.setState(preState => ({
          gameStatus: gameStatusConstants.lost,
          score: preState.score - 1,
        }))
      }
    }
  }

  renderGameInProgressView = () => {
    const {choicesList} = this.props
    return (
      <GameOptionsList>
        {choicesList.map(each => (
          <GameOptions
            key={each.id}
            optionDetails={each}
            onClickSetUserChoice={this.onClickSetUserChoice}
          />
        ))}
      </GameOptionsList>
    )
  }

  renderGameWonView = () => {
    const {gameChoice, userChoice} = this.state
    const {choicesList} = this.props
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]

    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]

    return (
      <GameResultViewContainer>
        <SelectedOptionsContainer>
          <GameUserOptionContainer>
            <GameParticipantText>You</GameParticipantText>
            <GameParticipantChoiceImage
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </GameUserOptionContainer>
          <GameUserOptionContainer>
            <GameParticipantText>Other</GameParticipantText>
            <GameParticipantChoiceImage
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </GameUserOptionContainer>
        </SelectedOptionsContainer>
        <ResultText>YOU WON</ResultText>
        <PlayAgainBtn type="button" onClick={this.onClickGoToGameView}>
          PLAY AGAIN
        </PlayAgainBtn>
      </GameResultViewContainer>
    )
  }

  renderFailureView = () => {
    const {gameChoice, userChoice} = this.state
    const {choicesList} = this.props
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]
    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]
    return (
      <GameResultViewContainer>
        <SelectedOptionsContainer>
          <GameUserOptionContainer>
            <GameParticipantText>You</GameParticipantText>
            <GameParticipantChoiceImage
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </GameUserOptionContainer>
          <GameUserOptionContainer>
            <GameParticipantText>Other</GameParticipantText>
            <GameParticipantChoiceImage
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </GameUserOptionContainer>
        </SelectedOptionsContainer>
        <ResultText>YOU LOSE</ResultText>
        <PlayAgainBtn type="button" onClick={this.onClickGoToGameView}>
          PLAY AGAIN
        </PlayAgainBtn>
      </GameResultViewContainer>
    )
  }

  renderWithDrwaVie = () => {
    const {gameChoice, userChoice} = this.state
    const {choicesList} = this.props
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]
    const gameChoiceObjectLIST = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectLIST[0]
    return (
      <GameResultViewContainer>
        <SelectedOptionsContainer>
          <GameUserOptionContainer>
            <GameParticipantText>You</GameParticipantText>
            <GameParticipantChoiceImage
              src={userChoiceObject.imageUrl}
              alt="your choice"
            />
          </GameUserOptionContainer>
          <GameUserOptionContainer>
            <GameParticipantText>Other</GameParticipantText>
            <GameParticipantChoiceImage
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
            />
          </GameUserOptionContainer>
        </SelectedOptionsContainer>
        <ResultText>IT IS DRAW</ResultText>
        <PlayAgainBtn type="button" onClick={this.onClickGoToGameView}>
          PLAY AGAIN
        </PlayAgainBtn>
      </GameResultViewContainer>
    )
  }

  renderGameView = () => {
    const {gameStatus} = this.state
    switch (gameStatus) {
      case gameStatusConstants.inProgress:
        return this.renderGameInProgressView()
      case gameStatusConstants.win:
        return this.renderGameWonView()
      case gameStatusConstants.lost:
        return this.renderFailureView()
      case gameStatusConstants.draw:
        return this.renderWithDrwaVie()
      default:
        return null
    }
  }

  render() {
    const {score} = this.state
    return (
      <AppContainer>
        <ResultContainer>
          <OptionsContainer>
            <Option>
              ROCK
              <br />
              <br />
              PAPER
              <br />
              <br />
              SCISSORS
            </Option>
          </OptionsContainer>
          <ScoreContainer>
            <ScorePhase>Score</ScorePhase>
            <ScoreNumber>{score}</ScoreNumber>
          </ScoreContainer>
        </ResultContainer>
        <GameViewContainer>{this.renderGameView()}</GameViewContainer>
        <PopupContainer>
          <Popup
            modal
            trigger={<TriggerButton type="button">RULES</TriggerButton>}
            closeOnEscape
            window
          >
            {close => (
              <PopupBody>
                <PopupImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
                <CloseButton type="button" onClick={() => close()}>
                  <RiCloseLine />
                </CloseButton>
              </PopupBody>
            )}
          </Popup>
        </PopupContainer>
      </AppContainer>
    )
  }
}

export default RockPaperScissors
