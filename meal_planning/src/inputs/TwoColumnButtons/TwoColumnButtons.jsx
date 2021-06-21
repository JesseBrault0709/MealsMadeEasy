import { Container, Row, Col } from "react-bootstrap"

export function TwoColumnButtons(props) {
    
    if (props.children === undefined || props.children === null) {
        throw new Error('props.children must not be null or undefined')
    }

    if (props.children.length % 2 !== 0) {
        throw new Error('props.children must contain an even number of buttons')
    }

    return <Container>
        {
            props.children.map((button, index) => {
                if (index % 2 === 0) { // only work with even indexes (i.e., first, third, fifth button, etc.)
                    return <Row key={index}>
                        <Col>{button}</Col>
                        <Col>{props.children[index + 1]}</Col>
                    </Row>
                } else {
                    return ''
                }
            })
        }
    </Container>
}