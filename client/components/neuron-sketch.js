import React from 'react'
import p5 from 'p5'

/* React Class Component */

export default class NeuronSketch extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Sketch = p => {
    let network

    p.setup = () => {
      p.createCanvas(
        p.windowWidth * 0.5,
        p.windowWidth * 0.5 * (4 / 7),
        p.WEBGL
      )
    }

    p.draw = () => {
      p.background(0)

      let radius = p.width * 1.5

      //drag to move the world.
      p.orbitControl()

      p.normalMaterial()

      p.translate(0, 0, -600)

      for (let i = 0; i <= 12; i++) {
        for (let j = 0; j <= 12; j++) {
          p.push()

          let a = j / 12 * p.PI

          let b = i / 12 * p.PI

          p.translate(
            p.sin(2 * a) * radius * p.sin(b),
            p.cos(b) * radius / 2,
            p.cos(2 * a) * radius * p.sin(b)
          )

          p.box(30, 30, 30)

          p.pop()
        }
      }
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth * 0.5, p.windowWidth * 0.5 * (4 / 7))
    }
  }

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current)
  }

  render() {
    return (
      <div className="column-items">
        {' '}
        <div ref={this.myRef} />{' '}
      </div>
    )
  }
}
