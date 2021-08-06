import { useParams } from 'react-router-dom';
import { Spinner, MDPreview } from '@/components/Elements';
import { Head } from '@/components/Head';
import { ContentLayout } from '@/components/Layout';
import { UpdatePost } from '../components/UpdatePost';
import { usePost } from '../hooks/usePost';

export const Post = () => {
    const { postId } = useParams();
    const postQuery = usePost({ postId });

    if (postQuery.isLoading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!postQuery.data) return null;

    return (
        <>
            <Head title={ postQuery.data.title } />
            <ContentLayout title={ postQuery.data.title }>
                <span className="text-xs font-bold">{ postQuery.data.createdAt }</span>
                <div className="mt-6 flex flex-col space-y-16">
                    <div className="flex justify-end">
                        <UpdatePost postId={ postQuery.data.id } />
                    </div>
                    <div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <div className="mt-1 max-w-2xl text-sm text-gray-500">
                                    <MDPreview value={ postQuery.data.body } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentLayout>
        </>
    );
};
