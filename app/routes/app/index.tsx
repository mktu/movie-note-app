import { useContext } from "react";
import { UserContext } from "~/providers/user";

export default function Index() {
    const { name } = useContext(UserContext)
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <h1 className="text-2xl">Welcome {name}. You are sigined in</h1>
            <ul>
                <li>
                    <a
                        target="_blank"
                        href="https://remix.run/tutorials/blog"
                        rel="noreferrer"
                    >
                        15m Quickstart Blog Tutorial
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="https://remix.run/tutorials/jokes"
                        rel="noreferrer"
                    >
                        Deep Dive Jokes App Tutorial
                    </a>
                </li>
                <li>
                    <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
                        Remix Docs
                    </a>
                </li>
            </ul>
        </div>
    );
}
