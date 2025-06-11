import { Box, Content, FullPageMessage } from "@lunagic/prometheus";
import { Link } from "../link";

export function PageHome() {
    return (
        <FullPageMessage>
            <Box>
                <Content>
                    <h1>
                        HTTPlay.dev
                    </h1>
                    <p>
                        <Link href="/games" >Games</Link>
                    </p>
                </Content>
            </Box>
        </FullPageMessage>
    )
}
