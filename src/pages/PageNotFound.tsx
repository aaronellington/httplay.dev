import { Box, Content, FullPageMessage } from "@lunagic/prometheus";
import { Link } from "../link";

export function PageNotFound() {
    return (
        <FullPageMessage>
            <Box>
                <Content>
                    <h1>
                        HTTPlay.dev
                    </h1>
                    <p>Not Found</p>
                    <p>
                        <Link href="/">Go Home</Link>
                    </p>
                </Content>
            </Box>
        </FullPageMessage>
    )
}
