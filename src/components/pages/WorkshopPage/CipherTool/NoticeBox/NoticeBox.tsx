import './NoticeBox.css'

function NoticeBox({ text }: { text: string }) {
    return (
        <span className="notice-box">
            {text}
        </span>
    )
}

export default NoticeBox