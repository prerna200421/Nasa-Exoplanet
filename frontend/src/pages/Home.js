import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import CardListContainer from "../components/CardListContainer";
import { exoplanets } from '../components/exoplanets';
import "./styles/Home.css";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            exoplanets: exoplanets,
            searchfield: ''
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render() {
        const filteredexoplanets = this.state.exoplanets.filter(exoplanet => {
            return exoplanet.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });

        return (
            <div className="tc">
                <h1>The Adventure Awaits: Exploring Exoplanets and the Mysteries of the Universe!</h1>
                <div className="tl">
                    <h2>What are Exoplanets?</h2>
                    <h4>Exoplanets, or extrasolar planets, are planets located outside our solar system. They orbit stars other than our Sun and are of great interest to scientists and space enthusiasts. As of now, thousands of exoplanets have been discovered, and they come in various sizes, compositions, and distances from their stars. Some might even have conditions suitable for life!</h4>
                    <br />
                    <h2>Why Explore Exoplanets?</h2>
                    <h4>Studying exoplanets helps us understand more about the universe and our place in it. By examining these distant worlds, scientists can learn about planet formation, the potential for life on other planets, and the variety of planetary systems that exist. Exoplanet research can also enhance our knowledge of Earth and the conditions that make it unique.</h4>
                </div>
                <SearchBox searchChange={this.onSearchChange} />
                <CardListContainer searchfield={this.state.searchfield} cardList= { <CardList exoplanets={filteredexoplanets} /> } />
        

                {/* Research Challenge Section */}
                <section className="research-challenge">
                    <h2>Join the Exoplanet Research Challenge!</h2>
                    <p>Are you ready to embark on an exciting journey beyond our solar system? Research your favorite exoplanet and investigate the possibility of alien life!</p>
                    <h3>What to Do:</h3>
                    <ol>
                        <strong>Choose Your Exoplanet:</strong> Pick from our list of fascinating worlds!<br></br>
                        <strong>Explore:</strong> Dive deep into research about your chosen planet.<br></br>
                        <strong>Submit Your Findings:</strong> Send your report or presentation to <a href="https://mail.google.com/mail/u/0/#inbox?compose=FZxzwjphVxLWBqZgFcGTKTscFsZDCnKKzqVBvQGwZPkztNDDCfWSgnPBwKDHpMJFgNQnNmNgNvWnlKgDzjCzrTjdXTRzzlfqhkzZqpcHtnNllvMvdgJNnLvMpgNdQFzbCmzlMdGKQRDmfflGjNTljPJppWwGQXLjThGDV">1mp22cs009@bgscet.ac.in</a> by 2nd JAN 2025.<br></br>
                    </ol>
                    <h3>Exciting Rewards Await!</h3>
                    <p>Selected participants will receive amazing awards, including certificates, science kits, and the chance to present their findings!</p>
                    <h3>Get Creative!</h3>
                    <p>Include visuals, videos, or even a creative story about your findings!</p>

                    <div className="certificate-container">
                        <h3>Sample Award Certificate</h3>
                        <a href="https://www.canva.com/design/DAGSoMOwLp0/I051zgfcW5alyee0UI6v5Q/view?utm_content=DAGSoMOwLp0&utm_campaign=designshare&utm_medium=link&utm_source=editor" target="_blank" rel="noopener noreferrer">
                        Download Sample Certificate</a>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
