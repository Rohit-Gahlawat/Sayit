import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
type Content = {
    text: string
    onClick: () => void | Promise<void>
}
export default function Buttons({ text, onClick }: Content) {
    return (
        <Stack spacing={2} className='w-full'>

            <Button onClick={onClick} className='!bg-black !w-full !rounded-xl' variant="contained">{text}</Button>

        </Stack>
    );
}
