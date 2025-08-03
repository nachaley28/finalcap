import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import { DataCounter, GridExample, TestDatatable } from '../../components/general/DataVisualizer';


export default function AdminDashboardIndex() {

    return (
        <>
            <div className="container-fluid">
                <div className="h4">General System Information</div>
                <div className="row">
                    <DataCounter title='New Stock' value='26' variant='info' />
                    <DataCounter title='On the way' value='332' variant='info' />
                    <DataCounter title='in transit' value='5' variant='info' />
                    <DataCounter title='Elon Musk' value='1' variant='warning' />
                    <DataCounter title='return' value='21' variant='danger' />
                </div>

                <Tabs defaultActiveKey="home" className="mb-3">
                    <Tab eventKey="home" title="Home">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Accordion Item #1</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Accordion Item #2</Accordion.Header>
                                <Accordion.Body>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Tab>

                    <Tab eventKey="profile" title="Profile">
                        <TestDatatable />
                    </Tab>
                    
                    <Tab eventKey="contact" title="Contact">
                        <GridExample />
                    </Tab>
                </Tabs>

            </div>
        </>
    )
}